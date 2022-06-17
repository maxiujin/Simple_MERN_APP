const router = require("express").Router();

//import todo model
const todoItemsModel = require("../models/todoItems");

//Create Route adding todo items to the db

router.post('/api/item', async (req, res)=>{
  try{
    const newItem = new todoItemsModel({
      item: req.body.item
    })
    //save this item in database
    const saveItem = await newItem.save()
    res.status(200).json(saveItem);
  }catch(err){
    res.json(err);
  }
})

//Second route --get data from the database
router.get("/api/items", async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.join(err);
  }
});

/// Update
router.put("/api/item/:id", async (req, res) => {
  try {
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Item Updated");
  } catch (err) {
    res.join(err);
  }
});

///DELETE
router.delete('/api/item/:id', async (req, res)=>{
    try{
      //find the item by its id and delete it
      const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Item Deleted');
    }catch(err){
      res.json(err);
    }
  })
  


//export

module.exports = router;
