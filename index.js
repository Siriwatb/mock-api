const express = require('express');
const app = express();
const port = 3200;

let requestCount = 0;
const requestDataLog = [];

app.use(express.json());

app.get('/monitor', (req, res) => {
    res.json({
        totalRequests: requestCount,
        requestLog: requestDataLog,
    });
});

// Mock endpoint for user login
app.post('/user/login', (req, res) => {
    requestCount++;
    requestDataLog.push({
        method: req.method,
        path: req.path,
        headers: req.headers,
        body: req.body,
        query: req.query,
        timestamp: new Date()
    });

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            expire: 1728490411,
            user_type: "user",
            company_group: "taximail",
            company_app_type: "default",
            app_package: "free",
            salepage_type: "default",
            member_config: null,
            session_id: "928a10be863309e67d7b79ba3e0430cb"
        }
    });
});

// Mock endpoint for transactional
app.post('/transactional', (req, res) => {
    requestCount++;
    requestDataLog.push({
        method: req.method,
        path: req.path,
        headers: req.headers,
        body: req.body,
        query: req.query,
        timestamp: new Date()
    });

    res.status(202).json({
        status: "success",
        code: 202,
        data: {
            message_id: "66df2381839f2b05e033dc2c",
            claimed: 1
        }
    });
});

app.all('*', (req, res) => {
    requestCount++;
    requestDataLog.push({
        method: req.method,
        path: req.path,
        headers: req.headers,
        body: req.body,
        query: req.query,
        timestamp: new Date()
    });

    res.json({ message: 'Mock API response', requestCount });
});



app.listen(port, () => {
    console.log(`Mock API listening on http://localhost:${port}`);
});
