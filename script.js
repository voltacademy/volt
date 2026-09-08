const SUPABASE_URL =
    "https://sirviduxzhfspyaaocea.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_jOaxgmkDUHqYsP0bOFBkzw_4zqkUosc";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


async function signUp() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const { data, error } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

    if (error) {
        document.getElementById("message").textContent =
            error.message;
        return;
    }

    document.getElementById("message").textContent =
        "Account created successfully!";
}


async function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        document.getElementById("message").textContent =
            error.message;
        return;
    }

    window.location.href = "community.html";
}
async function checkUser() {

    const { data: { user } } =
        await supabaseClient.auth.getUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("user").textContent =
        "Logged in as: " + user.email;
}


async function logout() {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }

    window.location.href = "index.html";
}
async function createPost() {

    const title =
        document.getElementById("postTitle").value;

    const content =
        document.getElementById("postContent").value;

    if (!title || !content) {
        document.getElementById("postMessage").textContent =
            "Please enter a title and content.";

        return;
    }

    const { data: { user } } =
        await supabaseClient.auth.getUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const { error } =
        await supabaseClient
        .from("posts")
        .insert({
            user_id: user.id,
            title: title,
            content: content
        });

    if (error) {
        document.getElementById("postMessage").textContent =
            error.message;

        return;
    }

    document.getElementById("postMessage").textContent =
        "Post published successfully!";

    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";

    loadPosts();
}


async function loadPosts() {

    const { data: { user } } =
        await supabaseClient.auth.getUser();

    const { data, error } =
        await supabaseClient
        .from("posts")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) {
        console.log(error);
        return;
    }

    const container =
        document.getElementById("posts");

    container.innerHTML = "";

    data.forEach(post => {

        container.innerHTML += `
            <article>
                <h3>${post.title}</h3>

                <p>${post.content}</p>

                <small>${post.created_at}</small>

                <br><br>

                <button onclick="deletePost(${post.id})">
                    DELETE THIS POST
                </button>

                <hr>
            </article>
        `;
    });
}
async function deletePost(postId) {

    const { error } =
        await supabaseClient
        .from("posts")
        .delete()
        .eq("id", postId);

    if (error) {
        alert(error.message);
        return;
    }

    alert("Post deleted!");

    loadPosts();
}
