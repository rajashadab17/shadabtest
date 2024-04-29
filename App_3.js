import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import emailjs from 'emailjs-com';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

class PrintableComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, PDF!</h1>
                <p>This is some content.</p>
                <Button>How you got it!</Button>
            </div>
        );
    }
}


function MyComponent() {
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    const [message, setmessage] = useState("")
    const [subject, setsubject] = useState("Notification from Shadab")
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const sendEmailWithPDF = async () => {
        // Trigger print action before sending email
        handlePrint();

        // Generate PDF
        const pdfBlob = await new Promise(resolve => {
            setTimeout(() => {
                const pdfContent = document.getElementById('printable-content').innerHTML;
                const pdf = new Blob([pdfContent], { type: 'application/pdf' });
                resolve(pdf);
            }, 1000); // Delay to ensure the PDF is fully generated
        });

        // Attach the PDF to the email
        const attachment = { filename: 'example.pdf', data: pdfBlob };

        // Send email with attachment
        const templateParams = {
            to_email: email, // Change to recipient's email
            subject: subject,
            message: message,
        };

        emailjs.send('service_mi09584', 'template_42p71pn', templateParams, 'jGyB9s0YqxRnt63od', [attachment])
            .then((response) => {
                console.log('Email sent successfully', response);
            })
            .catch((error) => {
                console.error('Email sending failed', error);
            });
    };

    return (
        <div>
            <div id="printable-content" style={{ display: 'none' }}>
                <PrintableComponent ref={componentRef} />
            </div>
            <div>
                <h2>Send Emails</h2>
                    <TextField label="Name" value={name} onChange={e => setname(e.target.value)} />
                    <TextField label="Email" value={email} onChange={e => setemail(e.target.value)} />
                    <TextField label="Message" value={message} onChange={e => setmessage(e.target.value)} />
            </div>
            <Button variant="contained" onClick={sendEmailWithPDF}>Send Email with PDF</Button>
        </div>
    );
}

export default MyComponent;
