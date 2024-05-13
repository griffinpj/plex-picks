import "./GroupUsers.css";

export default function InitGroup({ refresh, owner, users}: any) {
    return (
        <div class="group-users-container">
            <button class="button red">Start Picking</button>
            <button onClick={refresh} class="button blue narrow">Refresh</button>
            <h3>
                Created By: 
                {owner}
            </h3>
            <ul>
                {users && users.length && users.map((user: string) => (
                    <li> { user } </li>
                ))}
            </ul>
        </div>
    );
}
