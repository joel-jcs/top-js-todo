const ListController = () => {
    let lists = [];

    const createList = (listName, task) => {
        const list = {
            id: Date.now(),
            name: listName,
            tasks: [task],
        }

        lists.push(list);
        console.table(lists);
        
        return list;
    }

    const getLists = () => lists;

    
    //TO-DO
    const getList = (id) => {

    };

    const updateList = (id) => {

    };

    const deleteList = (id) => {

    };
    
    return {
        createList,
        getLists,
    }
};

export default ListController();