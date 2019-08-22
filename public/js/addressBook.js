$(document).ready(function() {
  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  var posts;

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/posts" + categoryString, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function() {
        getPosts();
      });
  }

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append("<table>" + "<tr>" + "<th>" + "First Name" + "</th>" + "<th>" + "Last Name" + "</th>" + "<th>" + 
    "Address" + "</th>" + "<th>" + "Phone Number" + "</th>" + "</tr>" + 
    "<tr>" + "<td>" + post.first_Name + "</td>" + "<td>" + post.last_Name + "</td>" + "<td>" + 
    post.address + "</td>" + "<td>" + post.phone_Number + "</td>" +"</tr>" + "</table>");
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.data("post", post);
    console.log("this is post data:" + newPostCard.data())
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/addPerson?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("Nobody here but us chickens, navigate <a href='/addPerson'>here</a> to add people.");
    blogContainer.append(messageH2);
  }
});
