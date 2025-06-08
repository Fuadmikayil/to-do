import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
import TasksList from '../TasksList'

export default async function TasksPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("inserted_at", { ascending: false });

  return (
    <main className="min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

      <form action={createTask} className="flex gap-2 mb-4">
        <input
          name="title"
          placeholder="New task"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      <TasksList
    tasks={tasks}
    editTaskAction={editTask}
    toggleTaskAction={toggleTask}
    deleteTaskAction={deleteTask}
  />
  
    </main>
  );
}

async function createTask(formData) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = formData.get("title");
  if (!title) return;

  await supabase.from("tasks").insert({ title, user_id: user.id });
  redirect("/userpanel/tasks");
}

async function toggleTask(formData) {
  "use server";
  const supabase = await createClient();
  const id = formData.get("id");

  const { data: task } = await supabase
    .from("tasks")
    .select("is_done")
    .eq("id", id)
    .single();
  if (!task) return;

  await supabase.from("tasks").update({ is_done: !task.is_done }).eq("id", id);
  redirect("/userpanel/tasks");
}
async function editTask(formData) {
  "use server";
  const supabase = await createClient();
  const id = formData.get("id");
  const title = formData.get("title");

  if (!id || !title) return;

  await supabase.from("tasks").update({ title }).eq("id", id);
  redirect("/userpanel/tasks");
}

async function deleteTask(formData) {
    'use server'
    const supabase = await createClient()
    const id = formData.get('id')
  
    if (!id) return
  
    await supabase.from('tasks').delete().eq('id', id)
    redirect('/userpanel/tasks')
  }
  