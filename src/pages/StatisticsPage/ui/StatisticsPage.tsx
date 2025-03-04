import {useEffect, useState} from "react";
import {Card, CardContent} from "@mui/material";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import api from "@/shared/api/api.ts";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatisticsPage = () => {
    const [stats, setStats] = useState({
        totalClients: 0,
        avgInteractions: 0,
        interactionsByClient: [],
        clientsByStatus: []
    });
/*
    useEffect(() => {
        async function fetchStats() {
            const response = await api.get("/clients/statistics");
            setStats(response.data);
        }
        fetchStats();
    }, []);*/

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2">Количество взаимодействий по клиентам</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.interactionsByClient}>
                            <XAxis dataKey="clientName" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="interactions" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2">Клиенты по статусу</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={stats.clientsByStatus}
                                dataKey="count"
                                nameKey="status"
                                outerRadius={100}
                                label
                            >
                                {stats.clientsByStatus.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold">Общее количество клиентов</h2>
                    <p className="text-3xl font-semibold">{stats.totalClients}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <h2 className="text-xl font-bold">Среднее количество взаимодействий на клиента</h2>
                    <p className="text-3xl font-semibold">{stats.avgInteractions.toFixed(1)}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default StatisticsPage;
