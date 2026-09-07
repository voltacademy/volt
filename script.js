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
