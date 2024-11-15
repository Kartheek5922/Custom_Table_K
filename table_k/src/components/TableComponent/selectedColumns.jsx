const ticket = { selectedColumns: [{ "name": "id", "type": "int" }, "name", "channel", "channel", "state", "on_behalf_of", "category", "sub_category", "status", "approval_state", "short_description", "active", "priority", "department", "task_type"] };
const document_manager = ["id", "document_type", "document_name", "created_by", "last_modified", "created_date"];
const email_log = ["id", "event", "date", "from_address", "to_address", "tags", "status", "last_updated", "subject"];
const feedBack = ["id", "title", "short_description", "date_of_submission", "ative", "created", "created_by"];
const flows = ["id", "flow_name", "active", "department", "category", "sub_category", "services", "created_by", "mode"];
const admin_portal_forms = ["id", "title", "department", "category", "sub_category", "created_by", "active", "standard"];
const alerts = ["id", "title", "type", "short_description", "active", "created_by"];
const approvals = ["id", "state", "approved_date", "short_description", "active", "name", "approval_group", "location", "due_date"];
const articles = ["id", "name", "content", "date", "publisher"];
const catalogs = ["id", "title", "department", "category", "sub_category", "active"];
const ci_transactions = ["id", "item_name", "item_tag", "item_description", "company", "serial_number", "model_number", "version", "storage", "operating_system", "os_domain"];
const cmdb = ["item_name", "item_tag", "company", "serial_number", "model_number", "operating_system", "version", "relationship_id"];
const company = ["id", "company_name", "city", "state", "postal_code", "phone_no", "currency"];
const connections = ["id", "name", "type", "authentication_type", "enabled", "created_at", "user", "status", "integration_type", "timeout", "cost", "version", "created_by"];
const core_transactions = ["id", "user_id", "title", "department", "email", "group_id", "group_email", "region", "company_id", "role_id", "location_id", "department_id", "connection_id", "user", "created_date", "contact_person"];
const countries = ["id", "name", "country_code", "iso-3166-2", "region", "sub_region", "intermediate_region"];
const department = ["id", "department_name", "manager", "contact_no", "active"];
const designs = ["id", "title", "department", "category", "product", "created_by", "no_of_fields"];
const group_names = ["group_id", "role_id", "user_id", "group_name", "manager_name", "parent_group", "region"];
const location = ["id", "location_name", "city", "state", "postal_code", "phone_no", "parent_location"];
const notifications = ["id", "name", "active", "to_address", "type", "created_by", "created"];
const reports = ["id", "title", "selected_table", "visibility", "display_table", "short_description", "view", "type", "created_by", "interval_duration"];
const roles = ["id", "department", "category", "sub_category", "service", "created_by", "status", "short_description", "active"];
const sla = ["id", "sla_name", "start_date", "target_date", "end_date", "duration", "created_by", "time_format"];
const tasks = ["id", "name", "on_behalf_of", "status", "short_description", "active", "priority", "departed", "state", "requested_by", "task_type", "quantity"];
const template = ["id", "name", "active", "typr", "style", "short_description", "created_by", "created"];
const users = ["id", "first_name", "last_name", "title", "department", "active", "email", "phone_no", "user_type"];
const videos = ["id", "image_url", "video_url"];
