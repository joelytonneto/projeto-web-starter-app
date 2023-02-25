
export interface Menu {
    id_menu: number;
    id: string;
    title: string;
    type: string;
    icon: string;
    link: string;
    id_sistema: number;
    has_sub_menu: boolean;
    parent_id: number;
    ordem: number;
    createdAt: Date;
    updatedAt: Date;
    subtitle: string;
}
