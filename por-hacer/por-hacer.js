const fs = require('fs');

let listToDo = [];

const saveToDB = () => {
    let data = JSON.stringify(listToDo);
    fs.writeFile('database/data.json', data, (err) => {
        if (err) throw new Error('Can not save file: ', err);
    });
}

const loadDB = () => {
    try {
        listToDo = require('../database/data.json');
    } catch (error) {
        listToDo = [];
    }
}

const create = (description) => {
    loadDB();
    let toDo = {
        description,
        complete: false
    }
    listToDo.push(toDo);
    saveToDB();
    return toDo;
};

const getList = () => {
    loadDB();
    return listToDo;
};

const update = (description, complete = true) => {
    loadDB();
    let index = listToDo.findIndex(e => e.description === description);

    if (index !== null && index >= 0) {
        listToDo[index].complete = JSON.parse(complete);
        saveToDB()
        return true;
    } else {
        return false;
    }
};

const remove = (description) => {
    loadDB();
    let newList = listToDo.filter(e => e.description !== description);
    if (newList.length !== listToDo.length) {
        listToDo = newList;
        saveToDB();
        return true;
    } else {
        return false
    }
};

module.exports = {
    create,
    getList,
    update,
    remove
}