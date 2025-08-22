import { supabase } from '../../supabase/client';
import type { ActivityType } from '../../types';

// Activity Type data service
export class ActivityTypeService {
    // Get all active activity types
    static async getActivityTypes(): Promise<ActivityType[]> {
        const { data: activityTypes, error } = await supabase
            .from('ActivityType')
            .select('id, name, category, unit, unitLabel, description, isActive, createdAt')
            .eq('isActive', true)
            .order('category')
            .order('name');

        if (error) throw new Error(error.message);

        return (activityTypes || []).map((activityType: any) => ({
            id: activityType.id,
            name: activityType.name,
            category: activityType.category,
            unit: activityType.unit,
            unitLabel: activityType.unitLabel,
            description: activityType.description,
            isActive: activityType.isActive,
            createdAt: activityType.createdAt
        }));
    }

    // Get activity types by category
    static async getActivityTypesByCategory(): Promise<Record<string, ActivityType[]>> {
        const activityTypes = await this.getActivityTypes();
        
        return activityTypes.reduce((acc, activityType) => {
            if (!acc[activityType.category]) {
                acc[activityType.category] = [];
            }
            acc[activityType.category].push(activityType);
            return acc;
        }, {} as Record<string, ActivityType[]>);
    }

    // Get a specific activity type by ID
    static async getActivityType(id: string): Promise<ActivityType | null> {
        const { data: activityType, error } = await supabase
            .from('ActivityType')
            .select('id, name, category, unit, unitLabel, description, isActive, createdAt')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // Not found
            throw new Error(error.message);
        }

        return {
            id: activityType.id,
            name: activityType.name,
            category: activityType.category,
            unit: activityType.unit,
            unitLabel: activityType.unitLabel,
            description: activityType.description,
            isActive: activityType.isActive,
            createdAt: activityType.createdAt
        };
    }

    // Get activity types by IDs
    static async getActivityTypesByIds(ids: string[]): Promise<ActivityType[]> {
        if (ids.length === 0) return [];

        const { data: activityTypes, error } = await supabase
            .from('ActivityType')
            .select('id, name, category, unit, unitLabel, description, isActive, createdAt')
            .in('id', ids);

        if (error) throw new Error(error.message);

        return (activityTypes || []).map((activityType: any) => ({
            id: activityType.id,
            name: activityType.name,
            category: activityType.category,
            unit: activityType.unit,
            unitLabel: activityType.unitLabel,
            description: activityType.description,
            isActive: activityType.isActive,
            createdAt: activityType.createdAt
        }));
    }
}
