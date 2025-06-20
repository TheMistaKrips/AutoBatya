const API_URL = "https://script.google.com/macros/s/AKfycbylEt_mQG-BrtaB86szs7Z569v3klevlTp87mWIPXcxzSBLy6-T7W1Kf-c3krbejCO3/exec";

const fetchWithRetry = async (url, options = {}, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                ...options,
                credentials: 'omit',
                referrerPolicy: 'no-referrer'
            });

            if (response.ok) {
                try {
                    return await response.json();
                } catch {
                    return { status: 'success' };
                }
            }
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
    throw new Error('Max retries reached');
};

export const fetchEmployees = async () => {
    try {
        const url = new URL(API_URL);
        url.searchParams.append('action', 'getEmployees');
        url.searchParams.append('cacheBuster', Date.now());

        const result = await fetchWithRetry(url.toString());
        return result.data || [];
    } catch (error) {
        console.error("Error fetching employees:", error);
        return [];
    }
};

export const addEmployeeToSheet = async (employee) => {
    try {
        const url = new URL(API_URL);
        url.searchParams.append('action', 'addEmployee');

        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('salary', employee.salary);
        formData.append('position', employee.position);

        await fetchWithRetry(url.toString(), {
            method: 'POST',
            body: formData
        });

        return true;
    } catch (error) {
        console.error("Error adding employee:", error);
        return false;
    }
};

export const fetchFinanceData = async () => {
    try {
        const url = new URL(API_URL);
        url.searchParams.append('action', 'getFinance');
        url.searchParams.append('cacheBuster', Date.now());

        const result = await fetchWithRetry(url.toString());
        return result.data || {
            income: 0,
            expenses: 0,
            profit: 0,
            records: []
        };
    } catch (error) {
        console.error("Error fetching finance data:", error);
        return {
            income: 0,
            expenses: 0,
            profit: 0,
            records: []
        };
    }
};

export const addFinanceRecord = async (record) => {
    try {
        const url = new URL(API_URL);
        url.searchParams.append('action', 'addFinanceRecord');

        const formData = new FormData();
        formData.append('type', record.type);
        formData.append('amount', record.amount);
        formData.append('description', record.description);
        formData.append('date', record.date);

        await fetchWithRetry(url.toString(), {
            method: 'POST',
            body: formData
        });

        return true;
    } catch (error) {
        console.error("Error adding finance record:", error);
        return false;
    }
};