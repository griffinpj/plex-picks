import "./GroupUsers.css";

export default function InitGroup(props: any) {
    return (
        <div class="group-users-container">
            <button class="button red">Start Picking</button>
            <button onClick={props.refresh} class="button blue narrow">Refresh</button>
            <h3>
                Created By: 
                {props.group?.owner}
            </h3>
            <ul>
                {props.group?.users && props.group?.users.length && props.group.users.map((user: string) => (
                    <li> { user } </li>
                ))}
            </ul>
        </div>
    );
}
