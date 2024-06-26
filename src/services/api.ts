import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getTodos(userId: string) {
  try {
    const response = await axios.get(`${apiUrl}/todos?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching todos", error);
  }
}

export async function postTodo({
  title,
  userId,
  username,
}: {
  title: string;
  userId: string;
  username: string;
}) {
  try {
    const response = await axios.post(`${apiUrl}/todos`, {
      title,
      userId,
      username,
    });
    return response.data;
  } catch (error) {
    console.log("Error posting todo", error);
  }
}
