const Plan = require('../models/plan')

exports.createPlan = async (req, res) => {
  const { title, description, amount, currency, planType } = req.body
  try {
    const plan = new Plan({
      title,
      description,
      amount,
      currency,
      planType,
    })
    await plan.save()
    return res.status(200).json({ message: 'Plan created successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.updatePlan = async (req, res) => {
  const { title, description, amount, currency, planType, isDeleted } = req.body
  try {
    const plan = await Plan.findById(req.params.id)
    plan.title = title ? title : plan.title
    plan.description = description ? description : plan.description
    plan.amount = amount ? amount : plan.amount
    plan.currency = currency ? currency : plan.currency
    plan.planType = planType ? planType : plan.planType
    plan.isDeleted = isDeleted ? isDeleted : plan.isDeleted
    plan.deletedAt = isDeleted ? Date.now() : plan.deletedAt
    await plan.save()
    return res.status(200).json({ message: 'Plan updated successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find()
    return res.status(200).json({ plans })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id)
    plan.isDeleted = true
    plan.deletedAt = Date.now()
    await plan.save()
    return res.status(200).json({ message: 'Plan deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.planById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id)
    return res.status(200).json({ plan })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}