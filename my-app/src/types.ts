export type Label = 'other' | 'personal' | 'work' | 'study'; // Adjust as needed

 export type Note = {
    id: number;
    title: string;
    content: string;
    label: Label;
    category: string; // Added thiss
 }; 