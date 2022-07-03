import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./task.css";
import {useDispatch, useSelector} from 'react-redux'



export default function Alltasks(props){
    const clientes = useSelector(state=>state)

    const [text, setText] =useState("")

    const [items, setItems] = useState([])


    function change (event){
        let t = event.target.value;
        setText(t)
    }
    function addItem (event){
        event.preventDefault();
        if (text) {
        setItems([...items, text])
        setText("")
    }
    }   

    return  (
        <div className="grupoTarefas">

            <div className="Tarefas">   
                Tarefas
                <form type ="text">
                    <input  onChange={change} type="text" value={text}></input>
                    <button >
                        Add
                    </button>

                </form>
                <ul>
                    <li>
                     {items.map(item => <li>{item}</li>)}
                    </li>
                </ul>

            </div>
        </div>
    )


}