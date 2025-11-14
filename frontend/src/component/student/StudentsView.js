import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";
import {
	FaEdit,
	FaEye,
	FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";
import api from "../../api";
import "../../addStudent.css"

const StudentsView = () => {
	const [students, setStudents] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {

		loadStudents();
	}, []);
	const loadStudents = async () => {
		try {
			const response = await api.get("/users/list", {
				withCredentials: true,
			});
			setStudents(response.data);
		} catch (error) {
			console.error("Error fetching My issue types:", error);
		}
	};
	console.log(students, 'students');

	const toggleStatus = async (id, currentStatus) => {

		try {
			const response = await api.put(
				`/users/${id}/status?active=${currentStatus}`,
				{
					withCredentials: true,
				}
			);
			console.log(response, 'response');
			if (response.status === 200) {
				// Update UI instantly
				setStudents(prev =>
					prev.map(st =>
						st.id === id ? { ...st, active_status: currentStatus } : st
					)
				);
				loadStudents();
			} else {
				console.error("Failed to update status");
			}

		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleDelete = async (id) => {
		await axios.delete(
			`http://localhost:8080/students/delete/${id}`
		);
		loadStudents();
	};

	return (
		<section>
			<Search
				search={search}
				setSearch={setSearch}
			/>
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Full Name</th>
						<th>User Name</th>
						<th>Role Number</th>
						<th>Email</th>
						<th>Role</th>
						<th>Status</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>

				<tbody className="text-center">
					{students
						.filter((st) =>
							st.fullName
								.toLowerCase()
								.includes(search)
						)
						.map((student, index) => (
							<tr key={student.id}>
								<th scope="row" key={index}>
									{index + 1}
								</th>
								<td>{student.fullName}</td>
								<td>{student.username}</td>
								<td>{student.rollNumber}</td>
								<td>{student.email}</td>
								<td>{student.role}</td>
								<td>
									<button
										className={`btn btn-sm ${student.active_status ? 'btn-success' : 'btn-secondary'}`}
										onClick={() => toggleStatus(student.id, student.active_status)}
									>
										{student.active_status ? 'Active' : 'De-Active'}
									</button>
								</td>
								<td className="mx-2">
									<Link
										to={`/student-profile/${student.id}`}
										className="btn btn-info">
										<FaEye />
									</Link>
								</td>
								<td className="mx-2">
									<Link
										to={`/edit-student/${student.id}`}
										className="btn btn-warning">
										<FaEdit />
									</Link>
								</td>
								<td className="mx-2">
									<button
										className="btn btn-danger"
										onClick={() =>
											handleDelete(student.id)
										}>
										<FaTrashAlt />
									</button>
								</td>
								<td>
									{student.userAttachments && student.userAttachments.length > 0 && (
										<div className="avatar-wrapper">
											{student.userAttachments.map((img, index) => {
												const imgUrl = `data:${img.fileType};base64,${img.fileData}`;

												return (
													<div key={index} className="avatar-wrapper">
														<img
															src={imgUrl}
															alt={img.fileName}
															className="avatar-small"
														/>
														<img
															src={imgUrl}
															alt="Large Preview"
															className="avatar-large"
														/>
													</div>
												);
											})}
										</div>
									)}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
	);
};

export default StudentsView;
