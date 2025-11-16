import React, {
	useEffect,
	useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";

const StudentPofile = () => {
	const { id } = useParams();
	const userRole = localStorage.getItem("role");
	const [student, setStudent] = useState({
		fullName: "",
		username: "",
		rollNumber: -1,
		email: "",
		role: "",
		active_status: false,
	});

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

	return (
		<section
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>
								<h5 className="my-3">
									{student.fullName}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									<button
										type="button"
										className="btn btn-outline-primary">
										{student.role}
									</button>
									<button
										type="button"
										className="btn btn-outline-warning ms-1">
										{`${student.active_status ? 'Active' : 'De-Active'}`}
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Full Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.fullName}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Role Number
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.rollNumber}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Email
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.email}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											user Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.username}
										</p>
									</div>

									<div className="col-sm-5 mt-3">
										{userRole !== 'STUDENT' ? (
											<Link
												to={"/view-students"}
												type="submit"
												className="btn btn-outline-warning btn-lg">
												Cancel
											</Link>
										): ''}
									</div>




								</div>


							</div>

						</div>





					</div>
				</div>
			</div>
		</section>
	);
};

export default StudentPofile;
