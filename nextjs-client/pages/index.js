import Head from 'next/head';
import { Client, Room } from "colyseus.js";
import {useEffect} from "react";


export default function Home() {

    const createRooms = async () => {
        const COLYSEUS_SERVER = "ws://localhost:2567";
        const GAME_ROOM = "game_room";
        const client = new Client(COLYSEUS_SERVER);
        let counter = 100;
        while (counter > 0) {
            console.log(counter);
            const room = await client.create(GAME_ROOM);
            console.log(`Session Id: ${room.sessionId}`);
            await room.leave();
            counter -= 1;
        }
    }

    useEffect (() => {
        createRooms();
    });


    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <p>Check console</p>

            </main>
        </div>
    )
}
