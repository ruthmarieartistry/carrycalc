import React from 'react';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calculator, FileText, Users, Settings, LogOut } from 'lucide-react';

export default function Portal() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const loggedInUser = await User.me();
                setUser(loggedInUser);
            } catch (e) {
                await User.login();
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await User.logout();
        window.location.reload();
    };

    // Replace these URLs with your actual base44 app URLs
    const apps = [
        {
            name: 'CARRYCalc',
            description: 'Financial stability assessments for gestational carrier candidates',
            icon: Calculator,
            color: '#005567',
            url: 'YOUR_CARRYCALC_APP_URL_HERE', // Replace with actual URL
        },
        {
            name: 'App 2',
            description: 'Description of your second app',
            icon: FileText,
            color: '#7d2431',
            url: 'YOUR_APP_2_URL_HERE', // Replace with actual URL
        },
        {
            name: 'App 3',
            description: 'Description of your third app',
            icon: Users,
            color: '#a5630b',
            url: 'YOUR_APP_3_URL_HERE', // Replace with actual URL
        },
        {
            name: 'App 4',
            description: 'Description of your fourth app',
            icon: Settings,
            color: '#217045',
            url: 'YOUR_APP_4_URL_HERE', // Replace with actual URL
        },
    ];

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <Card className="p-6">
                    <p className="text-lg">Loading...</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cd6cc9d7c75744747bf789/a12e5cf51_AlceaFontLogo.png" 
                            alt="Alcea" 
                            className="h-12 md:h-16 mb-2"
                        />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Team Portal</h1>
                        <p className="text-gray-600 mt-1">Access all your applications in one place</p>
                    </div>
                    
                    <Card className="w-full md:w-auto">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{user.full_name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="icon"
                                    onClick={handleLogout}
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Apps Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {apps.map((app, index) => (
                        <Card 
                            key={index}
                            className="hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group cursor-pointer"
                            onClick={() => window.open(app.url, '_blank')}
                        >
                            <CardHeader 
                                className="text-white"
                                style={{ backgroundColor: app.color }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                            <app.icon className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-xl">{app.name}</CardTitle>
                                    </div>
                                    <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <CardDescription className="text-base text-gray-700">
                                    {app.description}
                                </CardDescription>
                                <Button 
                                    className="w-full mt-4 text-white"
                                    style={{ backgroundColor: app.color }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(app.url, '_blank');
                                    }}
                                >
                                    Open Application
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Instructions */}
                <Card className="mt-8 border-0 bg-white">
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <Settings className="w-5 h-5" style={{ color: '#005567' }} />
                            How to Update Apps
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            To add or update applications in this portal, edit the <code className="bg-gray-100 px-2 py-1 rounded text-xs">apps</code> array 
                            in the Portal.js file. Replace the placeholder URLs with your actual base44 app URLs. You can also customize the names, 
                            descriptions, icons, and colors.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}