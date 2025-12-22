import React, {
	useEffect,
	useState,
} from "react";

import {
	Link,
	useNavigate,
	useParams,
} from "react-router-dom";
import api from "../../api";

const UpdateStudentAccount = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [student, setStudent] = useState({
		accountNumber: 0,
		ifscCode: "",
		bankName: "",
		branchName: ""
	});

	const {
		accountNumber,
		ifscCode,
		bankName,
		branchName,
	} = student;

	const loadStudent = async () => {
		try {
			const response = await api.get(`/users/${id}`, {
				withCredentials: true,
			});
			console.log(response.data, 'response.data');
			setStudent(response.data);
		} catch (error) {
			console.error("Error fetching My issue types:", error);
		}
	};

	useEffect(() => {
		loadStudent();
	}, []);

	const handleInputChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		});
	};
	const updateStudent = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("userId", student.id);
		formData.append("accountNumber", student.accountNumber);
		formData.append("ifscCode", student.ifscCode);
		formData.append("bankName", student.bankName);
		formData.append("branchName", student.branchName);

		try {
			await api.post("/users/update", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			navigate(`/student-profile/${localStorage.getItem("userID")}`);
		} catch (err) {
			console.log("Signup failed. " + err.response.data + " Try again.");
		}
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Add/Update Student Account Details</h2>
			<form onSubmit={(e) => updateStudent(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="fristName">
						Account Number
					</label>
					<input
						className="form-control col-sm-6"
						type="number"
						name="accountNumber"
						id="accountNumber"
						required
						value={accountNumber}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="lastName">
						IFSC Code
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="ifscCode"
						id="ifscCode"
						required
						value={ifscCode}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="lastName">
						Bank Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="bankName"
						id="bankName"
						required
						value={bankName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="email">
						Branch Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="branchName"
						id="branchName"
						required
						value={branchName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="row mb-5">
					<div className="col-sm-2">
						<button
							type="submit"
							className="btn btn-outline-success btn-lg">
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link
							to={`/student-profile/${localStorage.getItem("userID")}`}
							type="submit"
							className="btn btn-outline-warning btn-lg">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdateStudentAccount;
