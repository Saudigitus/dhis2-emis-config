import React, { useState } from 'react'
import { Stepper, Step } from 'react-form-stepper'
import WizardEnrollment from './WizardEnrollment'
import WizardProgram from './WizardProgram'
import WizardAttendance from './WizardAttendance'
import WizardTransfer from './WizardTransfer'
import WizardConfigDone from './WizardConfigDone'

const steps = [{ label: 'Program' }, { label: 'Staff registry' }, { label: 'Attendance' }, { label: 'Transfer' }]

export default function WizardForm() {
    const [wizardStep, setWizardSetp] = useState(0)

    const RenderContent = () => {
        switch (wizardStep) {
            case 0:
                return <WizardProgram setWizardSetp={setWizardSetp} />
            case 1:
                return <WizardEnrollment setWizardSetp={setWizardSetp} />
            case 2:
                return <WizardAttendance setWizardSetp={setWizardSetp} />
            case 3:
                return <WizardTransfer setWizardSetp={setWizardSetp} />
            case 4:
                return <WizardConfigDone />

            default:
                return <></>
        }
    }

    return (
        <>
            <Stepper
                activeStep={wizardStep}
                connectorStateColors={true}
                styleConfig={{
                    size: 40,
                    activeBgColor: 'blue',
                    completedBgColor: 'green'
                }}
                connectorStyleConfig={{
                    activeColor: 'green'
                }}
            >
                {steps.map((step, index) => (
                    <Step
                        key={index}
                        onClick={() => {
                            setWizardSetp(index)
                        }}
                        label={step.label}
                    />
                ))}
            </Stepper>
            <RenderContent />
        </>
    )
}
