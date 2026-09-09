```hcl
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "devops-application"
}

variable "vpc_cidr" {
  description = "VPC CIDR"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_1_cidr" {
  description = "Public subnet 1 CIDR"
  type        = string
  default     = "10.0.1.0/24"
}

variable "public_subnet_2_cidr" {
  description = "Public subnet 2 CIDR"
  type        = string
  default     = "10.0.2.0/24"
}

variable "availability_zone_1" {
  description = "Availability Zone 1"
  type        = string
  default     = "us-east-1a"
}

variable "availability_zone_2" {
  description = "Availability Zone 2"
  type        = string
  default     = "us-east-1b"
}

variable "ecr_repository_name" {
  description = "ECR repository name"
  type        = string
  default     = "devops-application"
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "devops-application-eks"
}

variable "eks_version" {
  description = "EKS Kubernetes version"
  type        = string
  default     = "1.33"
}

variable "node_group_name" {
  description = "EKS node group name"
  type        = string
  default     = "devops-application-nodes"
}

variable "node_instance_type" {
  description = "EKS worker node instance type"
  type        = string
  default     = "t3.small"
}
```
