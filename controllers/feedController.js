const Database = require("../libraries/databaseLib")

const db = new Database()

//function to get all posts
const getPosts = (req, res) =>{
  const data = db.posts() //calls database to get all posts
  res.status(200).json({ result: data })//sets status code to 200 and returns the result
}

//function to get post by id
const getPostById = (req, res) => {
  const id = req.params.id //extract id from params
  const data = db.postsById(id)

  if(data.length > 0){ //if result exists, return result
    res.status(200).json({ result: data })
  } else { //else result does note exist, return error 404
    res.status(404).json({ error: `Post ${id} not found`})
  }
}

//function to get post by id
const getPostByTitle = (req, res) => {
  const title = req.params.title //extract title from params
  const data = db.postsByTitle(title)

  if(data.length > 0){ //if result exists, return result
    res.status(200).json({ result: data })
  } else { //else result does note exist, return error 404
    res.status(404).json({ error: `Post ${title} not found`})
  }
}

const addPost = (req, res) => {
  const data = req.body; //extracting request body
  console.log("Add post", req.body)
  //our controller should check if the required properties exist before adding it to our database
  //according to our data model, we have "title" and "content" and "imgUrl"
  //we can check if each property exists, we can make "imgUrl" optional by not including it in the check here, but make sure to set the default in the library!
  if(data.title && data.content){
    const result = db.addPost(data)
    res.status(201).json({ result: "Post created!", databaseLength: result })
  } else { //else correct data properties don't exist, return error 400
    console.log("Error! Invalid post data!")
    res.status(400).json({ error: `Incorrect post data!`})
  }
}

//can you think of how to delete a post?
//how about updating/modifying an existing post?

module.exports = {
  getPosts,
  getPostById,
  getPostByTitle,
  addPost
}