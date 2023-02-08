const fs = require('fs').promises;
const { join } = require('path');

// const readArchive = async () => {
//     const arrayTalkers = await fs.readFile(join(__dirname, 'talker.json'), 'utf-8');
//     const response = JSON.parse(arrayTalkers);
//     console.log(response);
//     return response;
//     };

const archive = async () => {
    const path = '/talker.json';
    try {
      const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
      return JSON.parse(contentFile);
    } catch (error) {
        console.log(error);
      return null;
    }
  };

  const getAllTalkers = async () => {
    const talkers = await archive();
    return talkers;
  };

const getTalkerById = async (id) => {
    const talkers = await archive();
    return talkers.find((user) => user.id === id);
};
  module.exports = {
    getAllTalkers,
    getTalkerById,
    
    };