import React, {ChangeEventHandler, useState} from 'react'
import {connect} from "react-redux";
import {NewHeader} from "../components/NewHeader";
import {HeaderAction, startStreamAction} from "../actions/user";
import {IComboBoxProps, Link, Modal, TextField} from "@fluentui/react";
import {ComboBox, IComboBoxOption} from "office-ui-fabric-react";
import {Icon} from '@fluentui/react/lib/Icon';
import {store} from '../index'
//const io = require("socket.io-client");

import {BrowserRouter, Switch, Route, Redirect,useParams} from "react-router-dom";

const icons = [

    {key: 'CommentSolid', text: 'CommentSolid'},
    {key: 'Microphone', text: 'Microphone'},

];




// @ts-ignore
let socket;

interface StreamProps {
    state: any,
    dispatch: any
    id?:string
}

interface StreamState {
    name: string,
    icon: string,
    file: any,
    selected: boolean
    streamdata:any,
    id?:any,
    redirect:boolean
    products?:any
}


export function StreamID(props:StreamProps)
{
    // @ts-ignore
    const {id}=useParams();
    console.log(id);
    return <Stream id={id} state={props.state} dispatch={props.dispatch}/>
}


let startStream = () => {
    const path = window.location.pathname;
    const beforeLast = path.lastIndexOf('/', path.length - 2)
    const id = path.slice(beforeLast + 1, path.length - 1)

    //const socket = store.getState().stream.stream;

    const video = document.getElementById('video');
    const controlButton = document.getElementById('control');



    // @ts-ignore
    let stream = null;
    let mediaRecorder = null;
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(function (cameraStream) {
            stream = cameraStream;
            // @ts-ignore
            video.srcObject = stream;
            //startStream();

            // @ts-ignore
            controlButton.innerText = 'Stop stream';

            // @ts-ignore
            mediaRecorder = new MediaRecorder(stream, {mimeType: "video/webm"});
            mediaRecorder.start(300);

            // @ts-ignore
            mediaRecorder.ondataavailable = function (e) {
                if (e.data.size > 0) {
                    // @ts-ignore
                    socket.emit('package', e.data);
                }
            }

        })

};

export class Stream extends React.Component<StreamProps, StreamState> {

    constructor(props: StreamProps) {
        super(props);
        if (this.props.id!=='none') {
            this.state = {products :[],redirect:false, name: '', icon: 'CommentSolid', file: null, selected: true, streamdata:  this.props.id};
        } else {

            this.state = {products :[],redirect:false , name: '', icon: 'CommentSolid', file: null, selected: true, streamdata: null};
        }
    }
    Broadcast()
    {
        // @ts-ignore
        socket = io("https://194.67.78.79/");
        // @ts-ignore
        let channel = pusher.subscribe('stream-1');
        // @ts-ignore
        channel.bind('comment.sent', function(data) {
            console.log(JSON.stringify(data));
        });



        socket.emit("start", Number(this.state.streamdata));
        socket.once('started', () => {

            console.log("started");

        })

        socket.once('start', (event: any) => {

            console.log(event);
        })
    }
    componentDidMount() {

        let products=localStorage.getItem('products');

        if (products!==null)
        {
            products=JSON.parse(products).pr;
        }
        else
        {
            // @ts-ignore
            products=[];
        }
        console.log(products);
        this.setState({...this.state,products:products});

        if (this.props.id!=='none')
        {
            this.Broadcast();
        }
        this.props.dispatch(HeaderAction(this.props.id!=='none'? `Stream #${this.props.id}`:'Stream'));
    }

    // @ts-ignore
    render() {
        const changeHandler = (event: any) => {
            this.setState({...this.state, selected: true, file: event.target.files[0]});

        };
        const handleSubmission = async () => {
            const formData = new FormData();
            console.log(this.state.file)
            console.log(this.state.name)
            console.log(this.state.icon)
            formData.append('products', this.state.file);
            formData.append('name', this.state.name);
            formData.append('icon', this.state.icon);

            let request = await fetch(
                '/api/stream',
                {
                    method: 'POST',
                    // @ts-ignore
                    body: formData,
                    headers:
                        {

                            'Authorization': `Bearer ${this.props.state.token}`,

                        }
                }
            )

            if (request.ok) {
                let answer = await request.json();
                this.setState({...this.state, streamdata: answer.stream.id});
                localStorage.setItem('stream_id',String(answer.stream.id));
                localStorage.setItem('products',JSON.stringify({pr: answer.products}));
                this.setState({...this.state,redirect:true});
                console.log(answer);
                console.log(this.state.streamdata)
                // @ts-ignore

            } else {
                alert("ERROR");
            }
        }




        const onChange: IComboBoxProps['onChange'] = (event, option) => {

            this.setState({...this.state, icon: option!.key as string});

        };
        // @ts-ignore
        return this.props.id==='none' ? (

            <div className={'user_page'}>

                    <div className={'user1_text_field'}>

                        <TextField label={'Stream Name'}
                                   value={this.state.name}
                                   onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this.setState({
                                       ...this.state,
                                       name: String(newValue)
                                   })}

                        />


                    </div>
                    <ComboBox

                    selectedKey={this.state.icon}
                    scrollSelectedToTop
                    autoComplete="on"
                    options={icons}
                    onChange={onChange}

                    />


                    <Icon iconName={this.state.icon}/>

                    <div>
                    <input type={"file"} name={"file"} onChange={changeHandler}/>
                    <div>
                    <button onClick={handleSubmission}>Submit</button>
                    </div>
                    </div>


                {
                    this.state.redirect &&
                    <Redirect to={'/stream/'+this.state.streamdata}/>
                }
            </div>


        ) :
            (

                <div className={'user_page'}>


                    <Products products={this.state.products}/>



                    <div className="camera">
                        <video id="video" autoPlay>Video stream not available.</video>

                    </div>
                    <button id={"control"} onClick={startStream}>Start stream</button>


                </div>

            )
    }
}

interface prodPros
{
    products:any
}
function Products(props:prodPros)
{
    const [modal,setModal]=useState(false);
    const [current,setCurrent]=useState(null);
    const [cor,setCor]=useState([])
    let arr=[];
    // @ts-ignore
    let el;
    console.log(props.products);
    for (el of props.products)
    {

        arr.push(
            <div>
                <p>{el.name}</p>
                <Link onClink={
                    // @ts-ignore
                    ()=>setCor(cor+[el])} >Добавить в корзину</Link>
            </div>
        )
    }

    // @ts-ignore
    return <div>
        <h1>Products</h1>
        <div>
        {arr}</div>

<Cors cor={cor}/>
    </div>
}

export default Stream;

function Cors(props:{cor:any})
{

    let ar;
    let el;
    for (el of props.cor)
    {
        // @ts-ignore
        ar.push(<Link>{el.name}</Link>);
    }

    return <div>
        <h3>Cart</h3>

        {ar}
    </div>
}
