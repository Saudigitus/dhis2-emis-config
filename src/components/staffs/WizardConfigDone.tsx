import React from 'react'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import style from './index.module.css'

export default function WizardConfigDone() {
    return (
        <>
            <div className={style.configDoneContainer}>
                <IoCheckmarkDoneCircle className={style.configDoneIcon} />
                <div className={style.configDoneSuccessText}>Configuration Done with Success</div>
            </div>
        </>
    )
}
