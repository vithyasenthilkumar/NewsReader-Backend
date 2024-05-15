const newsModel = require('../models/newsModel')
const newsInitialData = require('../data/newsInitialData')


const getAllNews = async(request, response) => {
    try{
    const news = await newsModel.find()
    if (news.length === 0)
    {
       const news = await newsModel.insertMany(newsInitialData)
    }
    response.status(200).json(news)
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

const addNewNews = async(request, response) => {
    const newNews = request.body
    try{
        const existingNews = await newsModel.findOne({newsID:request.body.newsID})
        if (existingNews)
        {
            return response.status(409).json({message:'News ID already exsists.'})
        }
        const news = await newsModel.create(newNews)
        response.status(201).json(news)
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

const updateNews = async(request, response) => {
    const newsToBeUpdated = request.body
    try{
        
        const news = await newsModel.findOneAndUpdate({newsID:newsToBeUpdated.newsID}, newsToBeUpdated)
        response.status(201).json(news)
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

module.exports = {getAllNews, addNewNews, updateNews}