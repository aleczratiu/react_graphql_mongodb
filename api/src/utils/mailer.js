import Mailgun from 'mailgun-js';

const mailgun = new Mailgun({ apiKey: 'key-6b19238623cbac803a7f703f84fbe650', domain: 'sandbox61619bfdf80b4ab489b7e427078108ac.mailgun.org' });
const initialData = {
    from: 'contact@pp.com',
}

export default (data) => {
    try {
        mailgun.messages().send({
            ...initialData,
            ...data,
        }, (error, body) => {
            console.log(body);
        })
    } catch (error) {
        console.log('error', error);
    }
}
