app.get('/a', async (req, res) => {
    let edetails = await Edetails.findOne({})
    console.log(edetails)
     res.json({Emp_id:edetails.Emp_id, Join_Date: edetails.Join_Date, Salary: edetails.Salary, Employee_name: edetails.Employee_name})
})