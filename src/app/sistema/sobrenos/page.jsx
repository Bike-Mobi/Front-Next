'use client'

import TextInput from '@/components/sistema/inputs/TextInput'
import TextareaInput from '@/components/sistema/inputs/TextareaInput'
import { ApiContext } from '@/contexts/Api'
import React, { useContext, useEffect, useState } from 'react'

const Sobrenos = () => {

    const { instance } = useContext(ApiContext)

    // Estados individuais para cada input
    const [infos, setInfos] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [feedbackTitle1, setFeedbackTitle1] = useState()
    const [feedbackText1, setFeedbackText1] = useState()
    const [feedbackAuthor1, setFeedbackAuthor1] = useState()
    const [feedbackType1, setFeedbackType1] = useState()
    const [feedbackTitle2, setFeedbackTitle2] = useState()
    const [feedbackText2, setFeedbackText2] = useState()
    const [feedbackAuthor2, setFeedbackAuthor2] = useState()
    const [feedbackType2, setFeedbackType2] = useState()
    const [feedbackTitle3, setFeedbackTitle3] = useState()
    const [feedbackText3, setFeedbackText3] = useState()
    const [feedbackAuthor3, setFeedbackAuthor3] = useState()
    const [feedbackType3, setFeedbackType3] = useState()
    const [mission, setMission] = useState()
    const [instagramRoberlan, setInstagramRoberlan] = useState()
    const [facebookRoberlan, setFacebookRoberlan] = useState()
    const [linkedinRoberlan, setLinkedinRoberlan] = useState()
    const [instagram, setInstagram] = useState()
    const [facebook, setFacebook] = useState()
    const [youtube, setYoutube] = useState()
    const [email, setEmail] = useState()

    // Carregar informações da API
    useEffect(() => {
        instance.get('/abouts').then(resp => {
            const data = resp.data;
            setInfos(data)
            console.log(resp)
        })
    }, [instance])

    // Atualizar o objeto newData com todos os estados
    let newData = {
        title,
        description,
        feedback_title_1: feedbackTitle1,
        feedback_text_1: feedbackText1,
        feedback_author_1: feedbackAuthor1,
        feedback_type_1: feedbackType1,
        feedback_title_2: feedbackTitle2,
        feedback_text_2: feedbackText2,
        feedback_author_2: feedbackAuthor2,
        feedback_type_2: feedbackType2,
        feedback_title_3: feedbackTitle3,
        feedback_text_3: feedbackText3,
        feedback_author_3: feedbackAuthor3,
        feedback_type_3: feedbackType3,
        mission,
        instagram_roberlan: instagramRoberlan,
        facebook_roberlan: facebookRoberlan,
        linkedin_roberlan: linkedinRoberlan,
        instagram,
        facebook,
        youtube,
        email
    }

    // Funções handle para atualizar os estados conforme o input muda
    const handleTitle = (e) => setTitle(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleFeedbackTitle1 = (e) => setFeedbackTitle1(e.target.value)
    const handleFeedbackText1 = (e) => setFeedbackText1(e.target.value)
    const handleFeedbackAuthor1 = (e) => setFeedbackAuthor1(e.target.value)
    const handleFeedbackType1 = (e) => setFeedbackType1(e.target.value)
    const handleFeedbackTitle2 = (e) => setFeedbackTitle2(e.target.value)
    const handleFeedbackText2 = (e) => setFeedbackText2(e.target.value)
    const handleFeedbackAuthor2 = (e) => setFeedbackAuthor2(e.target.value)
    const handleFeedbackType2 = (e) => setFeedbackType2(e.target.value)
    const handleFeedbackTitle3 = (e) => setFeedbackTitle3(e.target.value)
    const handleFeedbackText3 = (e) => setFeedbackText3(e.target.value)
    const handleFeedbackAuthor3 = (e) => setFeedbackAuthor3(e.target.value)
    const handleFeedbackType3 = (e) => setFeedbackType3(e.target.value)
    const handleMission = (e) => setMission(e.target.value)
    const handleInstagramRoberlan = (e) => setInstagramRoberlan(e.target.value)
    const handleFacebookRoberlan = (e) => setFacebookRoberlan(e.target.value)
    const handleLinkedinRoberlan = (e) => setLinkedinRoberlan(e.target.value)
    const handleInstagram = (e) => setInstagram(e.target.value)
    const handleFacebook = (e) => setFacebook(e.target.value)
    const handleYoutube = (e) => setYoutube(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)

    const update = (newData) => {
        const form = new FormData();
        for (const key in newData) {
            if (newData[key] !== undefined) {
                form.append(key, newData[key]);
                console.log(key, newData[key])
            }
        }

        instance.postForm('/abouts?_method=PUT', form).then(resp => console.log(resp))
    }

    return (
        <div className='p-10'>
            <TextInput 
                name="Quem somos subtítulo"
                value={title ?? infos?.title}
                onChange={handleTitle}
                width="w-96"
            />
            <TextareaInput 
                name="Quem somos texto"
                value={description ?? infos?.description}
                onChange={handleDescription}
                width="w-96"
            />
            <TextInput 
                name="Feedback 1 título"
                value={feedbackTitle1 ?? infos?.feedback_title_1}
                onChange={handleFeedbackTitle1}
                width="w-96"
            />
            <TextareaInput 
                name="Feedback 1 texto"
                value={feedbackText1 ?? infos?.feedback_text_1}
                onChange={handleFeedbackText1}
                width="w-96"
            />
            <TextInput 
                name="Feedback 1 autor"
                value={feedbackAuthor1 ?? infos?.feedback_author_1}
                onChange={handleFeedbackAuthor1}
                width="w-96"
            />
            <TextInput 
                name="Feedback 1 tipo"
                value={feedbackType1 ?? infos?.feedback_type_1}
                onChange={handleFeedbackType1}
                width="w-96"
            />
            <TextInput 
                name="Feedback 2 título"
                value={feedbackTitle2 ?? infos?.feedback_title_2}
                onChange={handleFeedbackTitle2}
                width="w-96"
            />
            <TextareaInput 
                name="Feedback 2 texto"
                value={feedbackText2 ?? infos?.feedback_text_2}
                onChange={handleFeedbackText2}
                width="w-96"
            />
            <TextInput 
                name="Feedback 2 autor"
                value={feedbackAuthor2 ?? infos?.feedback_author_2}
                onChange={handleFeedbackAuthor2}
                width="w-96"
            />
            <TextInput 
                name="Feedback 2 tipo"
                value={feedbackType2 ?? infos?.feedback_type_2}
                onChange={handleFeedbackType2}
                width="w-96"
            />
            <TextInput 
                name="Feedback 3 título"
                value={feedbackTitle3 ?? infos?.feedback_title_3}
                onChange={handleFeedbackTitle3}
                width="w-96"
            />
            <TextareaInput 
                name="Feedback 3 texto"
                value={feedbackText3 ?? infos?.feedback_text_3}
                onChange={handleFeedbackText3}
                width="w-96"
            />
            <TextInput 
                name="Feedback 3 autor"
                value={feedbackAuthor3 ?? infos?.feedback_author_3}
                onChange={handleFeedbackAuthor3}
                width="w-96"
            />
            <TextInput 
                name="Feedback 3 tipo"
                value={feedbackType3 ?? infos?.feedback_type_3}
                onChange={handleFeedbackType3}
                width="w-96"
            />
            <TextareaInput 
                name="Descrição Roberlan"
                value={mission ?? infos?.mission}
                onChange={handleMission}
                width="w-96"
            />
            <TextInput 
                name="Instagram Roberlan"
                value={instagramRoberlan ?? infos?.instagram_roberlan}
                onChange={handleInstagramRoberlan}
                width="w-96"
            />
            <TextInput 
                name="Facebook Roberlan"
                value={facebookRoberlan ?? infos?.facebook_roberlan}
                onChange={handleFacebookRoberlan}
                width="w-96"
            />
            <TextInput 
                name="Linkedin Roberlan"
                value={linkedinRoberlan ?? infos?.linkedin_roberlan}
                onChange={handleLinkedinRoberlan}
                width="w-96"
            />
            <TextInput 
                name="Instagram Bike Mobi"
                value={instagram ?? infos?.instagram}
                onChange={handleInstagram}
                width="w-96"
            />
            <TextInput 
                name="Facebook Bike Mobi"
                value={facebook ?? infos?.facebook}
                onChange={handleFacebook}
                width="w-96"
            />
            <TextInput 
                name="Youtube Bike Mobi"
                value={youtube ?? infos?.youtube}
                onChange={handleYoutube}
                width="w-96"
            />
            <TextInput 
                name="Email de contato"
                value={email ?? infos?.email}
                onChange={handleEmail}
                width="w-96"
            />
            <button className='btn my-5' onClick={() => update(newData)}>Atualizar</button>
        </div>
    )
}

export default Sobrenos
