const express = require("express");
const router = express.Router();
const members = require("../../Members");

// get all members data from api
router.get("/", (req, res) => {
  res.json(members);
});

//get data of a member with the id specified

router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: "Oops!! Data not found" });
  }
});

// add a member
router.post("/", (req, res) => {
  const newMember = {
    id: 7,
    name: req.body.name,
    age: req.body.age,
    status: "active"
  };
  if (!newMember.name || !newMember.age) {
    return res.status(400).json({ msg: "Please provie name and age" });
  }

  members.push(newMember);
  res.json(members);
});

//update member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.age = updateMember.age ? updateMember.age : member.age;

        res.json({ msg: "Member data updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: "Oops!! Update failed, user not found" });
  }
});

//delete member data

router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: "Oops!! Data not found" });
  }
});

module.exports = router;
