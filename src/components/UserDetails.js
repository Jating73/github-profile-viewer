import React from 'react';
import './UserDetails.css'
import { Table, Image } from 'antd';

function UserDetails({ user_details, repo_details }) {

    const columns = [
        {
            title: 'Repo Name',
            dataIndex: 'name',
            key: 'repo-name',
        },
        {
            title: 'Stars',
            dataIndex: 'stargazers_count',
            key: 'stars',
        },
        {
            title: 'Default Branch',
            dataIndex: 'default_branch',
            key: 'default_branch',
        },
        {
            title: 'Repo URL',
            dataIndex: 'html_url',
            key: 'repo-url',
            render: (_, { html_url }) => (
                <a href={html_url}>{html_url}</a>
            ),
        }
    ];

    const data = repo_details.length ? repo_details : [];

    if (user_details
        && Object.keys(user_details).length === 0
        && Object.getPrototypeOf(user_details) === Object.prototype) {
        return;
    }

    return (
        <div className='user-details'>
            <div className='user-image text-center'>
                <Image src={user_details.avatar_url} />
                <div className='justify-content-center'>
                    {user_details.name ? (<p>Name: {user_details.name} </p>) : ''}
                    {user_details.bio ? <p>Bio: {user_details.bio}</p> : ''}
                    <div className=''>
                        {user_details.company ? <p>Company: {user_details.company}</p> : ''}
                        {user_details.location ? <p>Location: {user_details.location}</p> : ''}
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p>Followers: {user_details.followers}</p>
                        <p>Following: {user_details.following}</p>
                    </div>
                </div>
            </div>
            <div className='user-repos table-responsive'>
                <Table columns={columns} dataSource={data} />;
            </div>
        </div>
    )
}

export default UserDetails
