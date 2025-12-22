import React, {
    useEffect,
    useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import IssueTestImg from "../../asset/img/issue-test2.png";

const IssueView = () => {
    const { id } = useParams();
    const userRole = localStorage.getItem("role");

    const [issue, setIssue] = useState({
        title: "",
        description: "",
        priority: "LOW",
        amount: "",
        transactionId: "",
        transactionType: "",
        department: "",
        issueType: -1
    });
    console.log(issue, 'issue')
    const loadStudent = async () => {
        try {
            const response = await api.get(`/issues/${id}`, {
                withCredentials: true,
            });
            console.log(response.data, 'response.data');
            setIssue(response.data);
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
                                {/* <img
                                    src={IssueTestImg}
                                    alt="avatar"
                                    className="rounded-circle img-fluid"
                                    style={{ width: 150 }}
                                /> */}
                                <h5 className="my-3">
                                    <span style={{ fontSize: '22px', fontWeight: 700, fontStyle: 'italic', textAlign:'center'}}>Issue Title:<br /> </span>
                                    <span>  {issue.title}</span>
                                </h5>
                                <div className="d-flex justify-content-center mb-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary">
                                        <span style={{ fontSize: '22px', fontWeight: 700, fontStyle: 'italic' }}>Issue Created At: </span>  {new Date(issue.createdAt).toLocaleDateString("en-GB")}
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
                                            Issue Piority
                                        </h5>
                                    </div>

                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {issue.priority}
                                        </p>
                                    </div>
                                </div>

                                <hr />

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">
                                            Issue Status
                                        </h5>
                                    </div>

                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {issue.status}
                                        </p>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">
                                            Issue Description
                                        </h5>
                                    </div>

                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {issue.description}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">
                                            Issue Type
                                        </h5>
                                    </div>

                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {issue.issueType.displayName}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">
                                            Issue Department
                                        </h5>
                                    </div>

                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {issue.assignedToDepartment}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">
                                            Issue Category
                                        </h5>
                                    </div>

                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {issue.globalIssue ? "Global" : "Personal"}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">
                                            Issue Created By
                                        </h5>
                                    </div>

                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {issue?.student?.fullName}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">
                                            Issue Resolved By
                                        </h5>
                                    </div>

                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {issue?.resolvedBy?.fullName} ({issue?.resolvedBy?.role})
                                        </p>
                                    </div>
                                </div>
                                {issue.issueType.id === 6 &&
                                    (
                                        <>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h5 className="mb-0">
                                                        Total Amount
                                                    </h5>
                                                </div>

                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">
                                                        {issue?.amount}
                                                    </p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h5 className="mb-0">
                                                        Transaction Id
                                                    </h5>
                                                </div>

                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">
                                                        {issue?.transactionId}
                                                    </p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h5 className="mb-0">
                                                        Transaction Type
                                                    </h5>
                                                </div>

                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">
                                                        {issue?.transactionType}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">
                                            Issue Attachment
                                        </h5>
                                    </div>

                                    <div className="col-sm-9">

                                        {issue.attachments && issue.attachments.length > 0 && (
                                            <div className="d-flex gap-2 mb-2 flex-wrap">
                                                {issue.attachments.map((img, index) => {
                                                    const imgUrl = `data:${img.fileType};base64,${img.fileData}`;

                                                    return (
                                                        <div key={index} className="issue-image-wrapper">
                                                            <img
                                                                src={imgUrl}
                                                                alt={img.fileName}
                                                                className="issue-avatar"
                                                            />
                                                            <img
                                                                src={imgUrl}
                                                                alt="Large Preview"
                                                                className="issue-large-preview"
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row">


                                    <div className="col-sm-5 mt-3">
                                        {userRole !== 'STUDENT' ? (
                                            <Link
                                                to={"/statusChange"}
                                                type="submit"
                                                className="btn btn-outline-warning btn-lg">
                                                Cancel
                                            </Link>
                                        ) : ''}
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

export default IssueView;
