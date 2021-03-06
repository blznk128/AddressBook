$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/addperson?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  // var firstName = $("#firstName").val();
  var firstName = $("#firstName");
  var lastName = $("#lastName");
  var address = $("#address");
  var phoneNumber = $("#phoneNumber");
  var addForm = $("#add");
  
  $(addForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    
    // Constructing a newPost object to hand to the database
    var newPost = {
      first_Name: firstName.val().trim(),
      last_Name: lastName.val().trim(),
      address: address.val().trim(),
      phone_Number: phoneNumber.val().trim()
    };
    console.log(newPost);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Post) {
    $.post("/api/posts/", Post, function() {
      window.location.href = "/addressBook";
      console.log(Post)
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/posts/" + id, function(data) {
      if (data) {
        firstName.val(data.first_Name);
        lastName.val(data.last_Name);
        address.val(data.address);
        phoneNumber.val(data.phone_Number)
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
      .then(function() {
        window.location.href = "/addressBook";
      });
  }
});
