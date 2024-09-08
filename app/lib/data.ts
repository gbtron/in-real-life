import {sql} from '@vercel/postgres';
import { Lead } from './definitions';

export async function fetchLeads() {
    
    try {
        const data = await sql<Lead>`SELECT * FROM leads`;
        return data.rows;
        
    } catch (error) {
        console.log("Database error", error);
        throw new Error("Failed to fetch message data.")
    }
}

export const mockEvents = [
    {
        title: "Resume Workshop", 
        date: new Date("2024-10-07T18:30:00"), 
        membersEvent:true, 
        location: 'Study Room', 
        instructors: ["Tom Lowry"], 
        description: "Be sure to bring a copy of your resume to the event. We will be workshopping these so come prepared!", 
        sign: "mind"
    },
    {
        title: "Resume Workshop", 
        date: new Date("2024-10-07T18:30:00"), 
        membersEvent:true, 
        location: 'Study Room', 
        instructors: ["Tom Lowry"], 
        description: "Be sure to bring a copy of your resume to the event. We will be workshopping these so come prepared!", 
        sign: "mind"
    }
]

export const mockUser =[
    {
        type: "Member",
        first_name: "Jane",
        last_name: "Applert",
        email: "jappler@email.com",
        phone_number: "305-305-3055",
        username: "ottoPilot",
        password: "wordpass"
    }
]