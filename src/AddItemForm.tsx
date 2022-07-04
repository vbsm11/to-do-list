import React, {FC, ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = ({addItem}) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError(false);
        // e.currentTarget - в данном случае input
    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }

        setTitle("");
    }

    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddItem();
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                className={ error? 'error' : ''}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && <div style={{color: "red"}}>Title is required</div>}
        </div>
    )
}