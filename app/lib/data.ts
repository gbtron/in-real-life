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