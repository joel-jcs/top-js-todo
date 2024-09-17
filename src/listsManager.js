const list = () => {
    let lists = ["list 1", "list 2"];

    const createList = (listName) => {
        const list = {
            // id: Date.now(), UPDATE WITH THE REQUIRED date-fns
            name: listName,
            tasks: [],
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

export const { createList, getLists } = list();