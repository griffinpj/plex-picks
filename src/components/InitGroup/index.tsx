import "./InitGroup.css";

export default function InitGroup() {
    // TODO create group should create a new group in db associated with session
    // TODO join group should navigate to /group/[id]
    //  ask to create new name for given unique session
    //  display all "users"

    return (
        <div class="init-group-container">
            <a id="j-create-group" class="red">Create Group</a>
            <label for="j-join-group">
                Join Group
                <input 
                    type="text"
                    id="j-join-group" 
                    placeholder="Enter Group Code"
                />
            </label>
        </div>
    );
}
