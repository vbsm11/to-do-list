import React, {FC, ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddCircleOutline} from '@material-ui/icons';
import {IconButton, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = ({addItem}) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string>('');

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError('');
        // e.currentTarget - в данном случае input
    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError('Title is required')
        }

        setTitle("");
    }

    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddItem();
    }

    return (
        <div>
            <TextField
                size={'small'}
                label={'Title'}
                variant={'outlined'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={onClickAddItem} color={'primary'} size={'small'} disabled={!!error}>
                <AddCircleOutline fontSize={'large'}/>
            </IconButton>
        </div>
    )
}