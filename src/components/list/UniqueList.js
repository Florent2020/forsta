import React, { useEffect, useState } from "react";

function UniqueList() {
  const [lists, setLists] = useState([]);
  const [list, setList] = useState("");
  // console.log(list);

  useEffect(() => {
    const code = localStorage.getItem("items");
    const loadedItems = JSON.parse(code);

    if (loadedItems) {
      setLists(loadedItems);
    }
  }, []);

  useEffect(() => {
    const une = JSON.stringify(lists);
    localStorage.setItem("items", une);
  }, [lists]);

  function handleSubmit(e) {
    e.preventDefault();

    const newList = {
      id: new Date().getTime(),
      text: list,
    };

    setLists([...lists].concat(newList));
    setList("");
  }

  function deleteItem() {
    var newItem = document.getElementById("newItem");
    const updatedItems = [...lists].filter(
      (list) => list.text !== newItem.value
    );
    setLists(updatedItems);
    setList([]);
  }

  const clearItems = () => {
    setLists([]);
    localStorage.clear();
  };

  return (
    <>
      <h1>Unique List - Forsta R&D</h1>

      <form onSubmit={handleSubmit}>
        <input
          id="newItem"
          type="text"
          onChange={(e) => setList(e.target.value)}
          value={list}
        />
        <button type="submit" className="add">
          Add Item
        </button>
        <button type="button" className="remove" onClick={deleteItem}>
          Remove Item
        </button>
        <button onClick={clearItems} className="clear">
          Clear Items
        </button>
      </form>
      <ul className="items">
        {lists.map((list) => (
          <li key={list.id}>{list.text}</li>
        ))}
      </ul>
    </>
  );
}

export default UniqueList;
