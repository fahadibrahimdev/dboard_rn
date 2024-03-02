export const getShiftFromIdRed = (id: number, hbPayload: any) => {

    if (!!hbPayload && !!hbPayload.data && !!hbPayload.data.system_lookups && !!hbPayload.data.system_lookups.shift_data) {

        const matchedObj = hbPayload.data.system_lookups.shift_data.find((x: any) => x.id === id);

        if (!!matchedObj) {
            return matchedObj.name;
        } else {
            return '-';
        }
    } else {
        return '';
    }
}

export const getTeamFromIdRed = (id: number, hbPayload: any) => {

    if (!!hbPayload && !!hbPayload.data && !!hbPayload.data.system_lookups && !!hbPayload.data.system_lookups.teams) {

        const matchedObj = hbPayload.data.system_lookups.teams.find((x: any) => x.id === id);

        if (!!matchedObj) {
            return matchedObj.name;
        } else {
            return '-';
        }
    } else {
        return '';
    }
}


export const getAllTeamFromIdRed = (hbPayload: any) => {

    if (!!hbPayload && !!hbPayload.data && !!hbPayload.data.system_lookups && !!hbPayload.data.system_lookups.teams) {

        return hbPayload.data.system_lookups.teams
    } else {
        return [];
    }
}


export const getStatusNameFromIdRed = (id: number, hbPayload: any): string => {

    var dummyPayload = [
        { id: 1, name: 'Pending', code: 'PENDING' },
        { id: 2, name: 'Approved', code: 'APPROVED' },
        { id: 3, name: 'Denied', code: 'DENIED' },
    ];

    if (
        // !!hbPayload && !!hbPayload.data && !!hbPayload.data.system_lookups && !!hbPayload.data.system_lookups.shift_data
        !!dummyPayload
    ) {

        // const matchedObj = hbPayload.data.system_lookups.shift_data.find((x: any ) => x.id === id);
        const matchedObj = dummyPayload.find((x: any) => x.id === id);

        if (!!matchedObj) {
            return matchedObj.name;
        } else {
            return '-';
        }
    } else {
        return '';
    }
}


export const getStatusColorFromName = (name: string) => {

    if (name === 'Pending') {
        return '#d6d456';
    } else if (name === 'Approved') {
        return '#22A238';
    } else if (name === 'Denied') {
        return '#991122';
    } else {
        return '#22A238';
    }

}

export const getStatusColorBGFromName = (name: string) => {

    if (name === 'Pending') {
        return '#d6d45633';
    } else if (name === 'Approved') {
        return '#22A23833';
    } else if (name === 'Denied') {
        return '#99112233';
    } else {
        return '#22A23833';
    }

}


export const adjustTeamDataRed = (hbPayload: any): any => {
    if (!!hbPayload && !!hbPayload.data && !!hbPayload.data.user_lookups && !!hbPayload.data.user_lookups.teams) {

        return hbPayload.data.user_lookups.teams.map((x: any) => {
            return ({
                label: x.name, value: x.id.toString()
            })

        })
    } else {
        return [];
    }
}

export const adjustShiftDataRed = (hbPayload: any): any => {
    if (!!hbPayload && !!hbPayload.data && !!hbPayload.data.user_lookups && !!hbPayload.data.user_lookups.shift_data) {

        return hbPayload.data.user_lookups.shift_data.map((x: any) => {
            return ({
                label: x.name, value: x.id.toString()
            })

        })
    } else {
        return [];
    }
}

export const adjustUserDataRed = (payload: any): any => {
    if (!!payload && !!payload.data && payload.data.length > 0) {

        return payload.data.map((x: any) => {
            return ({
                label: x.user_name, value: x.user_id.toString(), teamId: x.team_id, teamName: x.teamName
            })

        })
    } else {
        return [];
    }
}



export const adjustSystemShiftDataRed = (hbPayload: any): any => {
    if (!!hbPayload && !!hbPayload.data && !!hbPayload.data.system_lookups && !!hbPayload.data.system_lookups.shift_data) {

        return hbPayload.data.system_lookups.shift_data.map((x: any) => {
            return ({
                label: x.name, value: x.id.toString()
            })

        })
    } else {
        return [];
    }
}

//DateTime Functions
export const formatTime = (timeString: string) => {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    // Format the time
    // const formattedTime = `${hours} hrs ${minutes} mins ${seconds} sec`;
    const formattedTime = `${hours} hrs ${minutes} mins`;

    return formattedTime;
}