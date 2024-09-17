const ListController = () => {
    let lists = [];

    const createList = (listName, task) => {
        const list = {
            id: Date.now(),
            name: listName,
            tasks: [task],
        }

        lists.push(list);
        
        return list;
    }

    const getLists = () => lists;

    const getList = (id) => {
        //pending
    };
    
    return {
        createList,
        getLists,
    }
};

export const { createList, getLists } = ListController();