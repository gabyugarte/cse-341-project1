const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().collection('Contacts').find();
  result.toArray().then((Contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(Contacts);
  });
};

const getSingle = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().collection('Contacts').find({ _id: contactId });
  result.toArray().then((Contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(Contacts[0]);
  });
};

const createContact = async (req, res) => {
  try {
    console.log('Received contact:', req.body);

    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await mongodb.getDatabase().collection('Contacts').insertOne(newContact);

    console.log(' Insert result:', result);

    res.status(201).json({ message: 'Contact created successfully', id: result.insertedId });
  } catch (err) {
    console.error('Error inserting contact:', err);
    res.status(500).json({ message: 'Error creating contact', error: err });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb.getDatabase().collection('Contacts').replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found or not updated' });
    }
  } catch (error) {
    console.error(' Error updating contact:', error);
    res.status(500).json({ message: 'Error updating contact', error });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('Contacts').deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};


module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
