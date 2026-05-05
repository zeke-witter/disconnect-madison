export type EventRow = {
    id: string;
    title: string;
    description: string;
    date: string;
    end_date: string | null;
    location_name: string;
    location_address: string | null;
    registration_required: boolean;
    capacity: number | null;
    cover_image_url: string | null;
    published: boolean;
    created_at: string;
    updated_at: string;
};
