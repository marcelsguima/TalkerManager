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

const saveUser = async (newTalker) => {
    const path = '/talker.json';
    try {
      const contentFile = await archive();
      console.log(archive);
      contentFile.push(newTalker);
      return await fs.writeFile(join(__dirname, path), JSON.stringify(contentFile));
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

const deleteTalker = async (id) => {
  const path = '/talker.json';
    const allTalkers = await archive();
    console.log('id', typeof id, id);
    const delTalker = allTalkers.findIndex((user) => user.id === Number(id));
    console.log('del talker', delTalker);
    if (delTalker === -1) {
      throw new Error(`Palestrante com id ${id} não encontrado`);
    }
    allTalkers.splice(delTalker, 1);
    console.log('allTalkers', allTalkers);
    await fs.writeFile(join(__dirname, path), JSON.stringify(allTalkers));
};
  module.exports = {
    getAllTalkers,
    getTalkerById,
    saveUser,
    deleteTalker,
    };