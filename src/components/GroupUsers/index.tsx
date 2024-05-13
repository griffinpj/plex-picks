import "./GroupUsers.css";

export default function InitGroup(props: any) {
    return (
        <div class="group-users-container">
            <a class="button red">Start Picking</a>
            <ul>
                {props.group && props.group.users!.map((user: string) => (
                    <li> { user } </li>
                ))}
            </ul>
        </div>
    );
}
