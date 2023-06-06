import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Submit = styled.button`
  width: 5rem;
  height: 2.5rem;
  background-color: #d0d0d0;
  border-radius: 5px;
  border: none;
`;

const Input = styled.input`
  width: 50%;
  height: 2.2rem;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  margin: 0 5px;
`;

const EditInput = styled.input`
  width: 80%;
  height: 100%;
  border: none;
  background-color: #fff;
`;

const Form = styled.form`
  text-align: center;
  height: 4rem;
  width: 100%;
  margin: 3rem auto;
`;

const List = styled.ul`
  text-align: center;
  height: 4rem;
  width: 100%;
  padding: 0;
  margin: 0 auto;
  list-style: none;
`;

const Item = styled.li`
  width: 80%;
  height: 2rem;
  background-color: #d0d0d0;
  border-radius: 5px;
  margin: 0.5rem auto;
  padding: 0.5rem;
`;

const ItemContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

function TodoList() {
  const [todoItems, setTodoItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editing, setEditing] = useState(-1);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      setTodoItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  const handleAddItem = () => {
    if (newItem !== "") {
      setTodoItems([...todoItems, newItem]);
      setNewItem("");
    }
  };

  const handleDeleteItem = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoItems(newTodoItems);
  };

  const handleEditItem = (index) => {
    setEditing(index);
    setEditValue(todoItems[index]);
  };

  const handleUpdateItem = (index, updatedValue) => {
    const newTodoItems = [...todoItems];
    newTodoItems[index] = updatedValue;
    setTodoItems(newTodoItems);
    setEditing(-1);
    setEditValue("");
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddItem();
        }}
      >
        <Input
          type="text"
          placeholder="Add a new item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Submit type="submit">Add</Submit>
      </Form>
      <List>
        {todoItems.map((item, index) => (
          <Item key={index}>
            {editing === index ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateItem(index, editValue);
                }}
              >
                <EditInput
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <Submit type="submit">Save</Submit>
              </form>
            ) : (
              <ItemContent>
                <span>{item}</span>
                <span>
                  <button onClick={() => handleEditItem(index)}>E</button>
                  <button onClick={() => handleDeleteItem(index)}>D</button>
                </span>
              </ItemContent>
            )}
          </Item>
        ))}
      </List>
    </div>
  );
}

export default TodoList;
