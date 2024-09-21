import {sql} from '@vercel/postgres';
import { Lead, Sign } from '@/app/lib/definitions';

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
        membersOnly: true, 
        location: 'Study Room', 
        instructors: ["Tom Lowry"], 
        description: "Be sure to bring a copy of your resume to the event. We will be workshopping these so come prepared!", 
        sign: "mind" as Sign
    }, {
        title: "Mindfulness Meditation",
        description: "A guided meditation session aimed at reducing stress and anxiety.",
        sign: "mind" as Sign,
        date: new Date('2024-09-21T10:00:00'),
        location: "Wellness Center, Room 2"
      },
      {
        title: "Yoga for Beginners",
        description: "A gentle yoga session focused on improving flexibility and mental clarity.",
        sign: "body" as Sign,
        date: new Date('2024-09-23T09:00:00'),
        location: "Main Gym"
      },
      {
        title: "Art Therapy Workshop",
        description: "Express your emotions through art in a therapeutic and supportive environment.",
        sign: "spirit" as Sign,
        date: new Date('2024-09-25T15:00:00'),
        location: "Art Room"
      },
      {
        title: "Cognitive Behavioral Therapy Skills",
        description: "Learn practical CBT techniques to manage negative thinking and emotions.",
        sign: "mind" as Sign,
        date: new Date('2024-09-27T11:00:00'),
        location: "Counseling Room 1"
      },
      {
        title: "Strength and Conditioning",
        description: "A fitness class designed to improve physical strength and build self-confidence.",
        sign: "body" as Sign,
        date: new Date('2024-09-29T16:00:00'),
        location: "Fitness Studio"
      },
      {
        title: "Spiritual Growth Circle",
        description: "A group discussion focused on personal and spiritual growth.",
        sign: "spirit" as Sign,
        date: new Date('2024-10-01T17:00:00'),
        location: "Community Room"
      },
      {
        title: "Mind Mapping Workshop",
        description: "Explore creative thinking and brainstorming techniques to enhance clarity of thought.",
        sign: "mind" as Sign,
        date: new Date('2024-10-03T14:00:00'),
        location: "Innovation Lab"
      },
      {
        title: "Cardio Kickboxing",
        description: "A high-energy class combining martial arts techniques with fast-paced cardio.",
        sign: "body" as Sign,
        date: new Date('2024-10-05T18:00:00'),
        location: "Main Gym"
      },
      {
        title: "Journaling for Healing",
        description: "A reflective journaling session to explore thoughts and emotions for spiritual growth.",
        sign: "spirit" as Sign,
        date: new Date('2024-10-07T19:00:00'),
        location: "Counseling Room 3"
      },
      {
        title: "Group Therapy Session",
        description: "A safe space for young adults to discuss personal challenges and mental health.",
        sign: "mind" as Sign,
        date: new Date('2024-10-09T13:00:00'),
        location: "Counseling Room 2"
      }
]